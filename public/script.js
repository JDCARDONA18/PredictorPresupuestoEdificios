function send(event) {

    event.preventDefault();

    const url = "http://127.0.0.1:8000/Predict-Presupuesto";
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

    axios.post(url, data).then((response) => {
        console.log(response);
        const result = response?.data?.prediction_result | 0;
        countUpPropertyValue(result);
    }).catch((error) => {
        console.log(error);
    });

    return false;

}

function updatePropertyValue(value) {
    const text = "$" + Number(value).toLocaleString("es-CO");
    document.getElementById("propertyValue").innerHTML = text;
}

function countUpPropertyValue(value) {

    const options = {
        startVal: 0,
        enableScrollSpy: true,
        duration: 20,
        end: 32000000
    };

    let demo = new CountUp('propertyValue', 0, Number(value), 0, 2, options);

    if (!demo.error) {
        demo.start();
    } else {
        console.error(demo.error);
    }

}