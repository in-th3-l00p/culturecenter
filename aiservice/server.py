from flask import Flask, request, send_file, after_this_request
import whisper
from elevenlabs import generate, set_api_key
import os
import json
from deep_translator import GoogleTranslator

app = Flask(__name__)
model = whisper.load_model("base")
set_api_key("42474569d82f15cae512b010c2332508")


@app.route('/api/ai/tts', methods=['POST'])
def tts():
    id = os.urandom(16).hex()
    voice = request.args.get('voice', default="Adam", type=str)
    language = request.args.get('language', default="en", type=str)
    text = json.loads(request.data)['text']

    translated = GoogleTranslator(source='auto', target=language).translate(text)

    audio = generate(
        translated,
        voice=voice,
        model="eleven_multilingual_v2"
    )
    filename = "utils/" + id + ".mp3"
    with open("utils/" + id + ".mp3", "wb") as out:
        out.write(audio)

    @after_this_request
    def remove_file(response):
        try:
            os.remove(filename)
        except Exception as error:
            app.logger.error("Error removing or closing downloaded file handle", error)
        return response

    return send_file(filename, mimetype='audio/mp3')

@app.route('/api/ai/stt', methods=['POST'])
def stt():
    language = request.args.get('language', default="en", type=str)

    try:
        file = request.files['audio']

        id = os.urandom(16).hex()
        file.save("utils/" + id + ".mp3")

        caption = model.transcribe("utils/" + id + ".mp3", language=language)
        os.remove("utils/" + id + ".mp3")

        return caption
    except Exception as e:
        return str(e), 400


if __name__ == '__main__':
    app.run(debug = True)