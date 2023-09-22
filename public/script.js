function send(event) {

    event.preventDefault();

    const url = `${BASE_URL}/Predict-Presupuesto`;
    const unids = Number(document.getElementById("unids").value);
    const metro2 = Number(document.getElementById("metro2").value);
    const numMachines = Number(document.getElementById("numMachines").value);
    const typeOfHousing = Number(document.getElementById("typeOfHousing").value);
    const numFloors = Number(document.getElementById("numFloors").value);
    const numTowers = Number(document.getElementById("numTowers").value);
    const securityPosts = Number(document.getElementById("securityPosts").value);
    const stratum = Number(document.getElementById("stratum").value);
    const commonZones = Number(document.getElementById("commonZones").value);

    const data = {
        unidades_privadas: unids,
        bien_privadom2: metro2,
        cantidad_equipos: numMachines,
        tipo: typeOfHousing,
        no_pisos: numFloors,
        torres: numTowers,
        puestos_seguridad: securityPosts,
        estrato_socio: stratum,
        zonas_comunes: commonZones
    }

    const boton = document.getElementById("calcBtn");
    boton.disabled = true;
    boton.innerText = "Cargando...";


    axios.post(url, data).then((response) => {
        console.log(response);
        const result = response?.data?.prediction_result || 0;
        const [V1, V2, V3] = response?.data?.nearest_neighbors || [];
        countUpPropertyValue(result);
        countUpPropertyValue(V1, 'propertyValueV1');
        countUpPropertyValue(V2, 'propertyValueV2');
        countUpPropertyValue(V3, 'propertyValueV3');
        boton.disabled = false;
        boton.innerText = "Calcular";
    }).catch((error) => {
        console.log(error);
    });

    return false;

}

function updatePropertyValue(value) {
    const text = "$" + Number(value).toLocaleString("es-CO");
    document.getElementById("propertyValue").innerHTML = text;
}

function countUpPropertyValue(value, elementId = 'propertyValue') {

    const options = {
        startVal: 0,
        enableScrollSpy: true,
        duration: 20,
        end: 32000000
    };

    let demo = new CountUp(elementId, 0, Number(value), 0, 2, options);

    if (!demo.error) {
        demo.start();
    } else {
        console.error(demo.error);
    }

}