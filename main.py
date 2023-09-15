import pickle
from fastapi.encoders import jsonable_encoder
import uvicorn
import pandas as pd
import os
from typing import List
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

PORT= int(os.getenv("PORT", 8000))
app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Edificio(BaseModel):

  unidades_privadas: int
  bien_privadom2: int
  tipo: int
  """if tipo == "Residencial":
    tipo = 1
  elif tipo == "Comercial":
    tipo = 2
  else:
    tipo = 3"""
  cantidad_equipos: int
  no_pisos: int
  torres: int
  puestos_seguridad: int
  estrato_socio: int
  zonas_comunes: int


app.mount("/public", StaticFiles(directory="public"), name="public")

@app.post("/Predict-Presupuesto")
def predict(edificio: Edificio):
  with open("model.pkl","rb") as file:
    nuevo_modelo = pickle.load(file)

  df_input = pd.DataFrame(edificio.model_dump(), index=[0])
  result = nuevo_modelo.predict(df_input)[0]
  return {'prediction_result': result }

if __name__=="__main__":
  uvicorn.run(app, host="0.0.0.0", port=PORT)