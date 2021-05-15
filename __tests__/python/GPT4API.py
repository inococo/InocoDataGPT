# Note: it does not work. I got 404 error when running it.

import os
from dotenv import load_dotenv
import requests
from requests.structures import CaseInsensitiveDict

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
gpt4_endpoint = "https://api.openai.com/v1/engines/davinci-codex/completions"

def send_image_and_text_to_gpt4(image_path, prompt):
    with open(image_path, "rb") as image_file:
        headers = CaseInsensitiveDict()
        headers["Authorization"] = f"Bearer {api_key}