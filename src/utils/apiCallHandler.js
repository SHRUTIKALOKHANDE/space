const getPlanetsData = async () => {
    try {
        let response = await (await fetch('https://findfalcone.herokuapp.com/planets')).json();
        if (response) {
            return response;
        }
    } catch (e) {
        return e;
    }
};

const getVehicleData = async () => {
    try {
        let response = await (await fetch('https://findfalcone.herokuapp.com/vehicles')).json();
        if (response) {
            return response;
        }
    } catch (e) {
        return e;
    }
};

const getToken = async () => {
    try {
        let response = await (
            await fetch(`https://findfalcone.herokuapp.com/token`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json',
                },
            })
        ).json();
        if (response) {
            return response;
        }
    } catch (e) {
        return e;
    }
};

const findFalcone = async (token, planetNames, vehicleNames) => {
    try {
        let response = await (
            await fetch(`https://findfalcone.herokuapp.com/find`, {
                method: `POST`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    planet_names: planetNames,
                    vehicle_names: vehicleNames,
                }),
            })
        ).json();
        if (response) {
            return response;
        }
    } catch (e) {
        return e;
    }
};

export {
    getPlanetsData,
    getVehicleData,
    getToken,
    findFalcone
};