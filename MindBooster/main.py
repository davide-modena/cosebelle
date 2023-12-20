import google.generativeai as palm
from pyscript import document

palm.configure(api_key='AIzaSyCF3K2X6VNKv_2qPecRRW3tJt9GtcHGtxI')

models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
model = models[0].name

prompt = """
Ask me 10 questions about "Drake" at a medium level. The question type is: quiz. Organize these questions in a JSON with an array called "questions", indicating the question ("question"), options ("options", 4 for the quiz, 2 for the true or false) and the right answer ("answer"). Make sure that the right answer is not always the first option. Make sure that the right answer is present in the options. Do not use double quotes in arguments, because they give problems to the JSON.
"""

completion = palm.generate_text(
    model=model,
    prompt=prompt,
    temperature=0,
    # The maximum length of the response
    max_output_tokens=800,
)

print(completion.result)

output_div = document.querySelector("#output")
output_div.innerText = completion.result