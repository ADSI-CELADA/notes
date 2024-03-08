import axios from "axios"

const serverUri2 = 'http://192.168.0.167:4000' || "http://192.168.0.104:4000"


export const signUp = (data) =>
    axios.post(`${serverUri2}/signUp`, data)

export const signIn = (data) =>
    axios.post(`${serverUri2}/sigIn`, data)
    












