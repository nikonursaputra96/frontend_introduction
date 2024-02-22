import { useState, useEffect } from "react"
import axios from "axios";


function App() {
  const [province, setProvince] = useState<{ id: number, name: string }[]>([])
  const [regency, setRegency] = useState<{id :number, name : string}[]>([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [district, setDistrict] = useState<{id: number, name : string}[]>([]) 
  const [selectedRegency, setSelectedRegency] = useState('')
  
  const getProvince = async () => {
    try {
      const response =  await axios.get (`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
      return setProvince(response.data)
    } catch (error) {
      console.log (error)
    }
    
  }

  useEffect (() => {
    getProvince()
  },[])




  const getRegency = async () => {
    try {
      if (selectedProvince !== ''){
        const response = await axios.get (`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
        console.log(response.data)
        return setRegency(response.data)
      }
    } catch (error) {
      console.log (error)
    }
  }

  const handleChange = (e :any) => {
    const provinceId = e.target.value
    setSelectedProvince(provinceId)
  }

  useEffect (() => { 
    getRegency()
  },[selectedProvince])



  const getDistrict  = async () => {
    try {
      if (selectedRegency !== '') {
        const response = await axios.get (`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`)
        console.log(response.data)
        return setDistrict(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeRegency = (e : any) => {
    const regencyId = e.target.value
    setSelectedRegency(regencyId)
  }

  useEffect(() => {
    getDistrict()
  },[selectedRegency])


  return (
    <div className="bg-body-secondary min-vh-100">
      <h1 className="d-flex justify-content-center py-5"> Select Your Region </h1>
      <div>
        <label className="d-flex justify-content-center mt-5 fs-4" htmlFor="Province">Province :</label>
        <select className="form-select w-50 mx-auto mt-3 form-select-lg" name="prov.name" id="prov.id" onChange={handleChange}>
        <option>Open this select menu</option>
          {province.map ((prov) => (
            <option key={prov.id} value={prov.id}>{prov.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="d-flex justify-content-center mt-4 fs-4" htmlFor="Regency">Regency / City :</label>
        <select className="form-select w-50 mx-auto mt-3 form-select-lg" name="regency.name" id="regency.id" onChange={handleChangeRegency}>
          {regency.map ((reg) => (
            <option key={reg.id} value={reg.id}>{reg.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="d-flex justify-content-center mt-4 fs-4" htmlFor="District">District :</label>
        <select className="form-select w-50 mx-auto mt-3 form-select-lg" name="district.name" id="district.id">
          {district.map ((dis) => (
            <option key={dis.id} value={dis.id}>{dis.name}</option>
          ))}
        </select>
      </div>
    </div>
  )

}

export default App
