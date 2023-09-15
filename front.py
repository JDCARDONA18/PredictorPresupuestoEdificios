import streamlit as st
import requests
from PIL import Image  


result = ''

with st.sidebar.form("my_form"):
    st.write("Inside the form")
    unidades_privadas = st.slider('Numero de unidades', 1, 1000)
    bien_privadom2 = st.number_input('Cantidad de metros cuadrados', min_value=1)
    cantidad_equipos = st.number_input('Numero de equipos', min_value=0)
    tipo = st.selectbox('Tipo Rs=1 / Com=2', ('1','2'))
    no_pisos = st.slider('Numero de pisos', 1, 70)
    torres = st.number_input('Cantidad de torres', min_value=1)
    puestos_seguridad = st.number_input('Puestos de seguridad', min_value=0)
    estrato_socio = st.number_input('Estrato', min_value=1)
    zonas_comunes = st.number_input('Cantidad de zonas comunes', min_value=0)
    
    submitted = st.form_submit_button("Submit")

if submitted:
    url = 'http://localhost:8000'
    data = {
        "unidades_privadas": unidades_privadas,
        "bien_privadom2": bien_privadom2,
        "cantidad_equipos": cantidad_equipos,
        "tipo": tipo,
        "no_pisos": no_pisos,
        "torres": torres,
        "puestos_seguridad": puestos_seguridad,
        "estrato_socio": estrato_socio,
        "zonas_comunes": zonas_comunes
    }
    response = requests.post(f'{url}/Predict-Presupuesto', json=data).json()
    result = response['prediction_result']
    
    #st.write("Resultado de la predicción:")
    st.markdown(
        f'<div style="background-color:#8639d8; padding: 10px; border-radius: 5px;">'
        f'<h4 style="color:#FFFFFF;">Predicción de presupuesto: ${result:,.2f}</h4>'
        f'</div>',
        unsafe_allow_html=True
    )
