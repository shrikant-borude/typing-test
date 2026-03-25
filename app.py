from flask import Flask, render_template
import random

app = Flask(__name__)

paragraphs = [
    "You want it on you? You need love, I need some too. Do you want this like it wants you?",
    "Quiet and willing to do whatever anyone else wanted, she was often favorably compared to a shadow.",
    "After removal from the oven, the pizza is sliced and plated quickly in a flat cardboard box, which is immediately closed and often taped shut. There is no physical separation after the slicing, so that edge can be ignored and we can treat the pizza, for thermal purposes, as an infinite plane.",
    "Numbing the pain for a while will make it worse when you finally feel it."
]

def get_random_paragraph():
    randomParagraph = paragraphs[random.randint(0, len(paragraphs) - 1)]
    return randomParagraph

@app.route("/")
def index():
    paragraph = get_random_paragraph()
    return render_template("index.html", paragraph=paragraph)

if __name__ == "__main__":
    app.run(debug=True)