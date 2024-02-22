import axios from "axios";

export const getProvince = (callback: any) => {
    axios.get (`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
    .then ((res) => {
        console.log(res.data)
        callback (res.data)
    })
    .catch((err) => {
        console.log(err);
    })
};

export const getRegency = async (provinceId : number) => {
    try {
        const response = await axios.get (`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
        console.log(response.data)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

