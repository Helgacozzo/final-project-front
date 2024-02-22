export const axiosOptions = (token) => {

    return {
        // Includi il token nell'header con il formato 'Bearer <token>'
        headers: { 'Authorization': `Bearer ${token}` }
    };

}
