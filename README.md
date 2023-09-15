instalr python

ejecutar
pip install -U pipenv

pipenv install

source "$(pipenv --venv)/Scripts/activate" #(para windows)
terminal 1
streamlit run front.py
terminal 2
python main.py