import allData from "./datatest"

class Profile{


    getAllProfileFromMongo(){}

    getProfileByIdFromMongo(){}


    getAllProfileFromStaticData(){
        alert();
        return allData;
    }

    getProfileByIdStaticData(idRef){
        //siempre indicar el tipo de datos
       const resolveData = allData.find(el=> String(el._id) == String(idRef));

       //resolviendo con un for of
        var dataToFind = null;
        for (const dt of allData){
            if (String(dt._id) == idRef && dataToFind == null){
                dataToFind = dt
            }
        }

        //retornando ambas soluciones
       return {resolveData, dataToFind};
    }

}

//instancio la clase
const profileController = new Profile()

//exporto un objeto con dicha instancia. Podría agregar mas variables a la exportacion 
export {profileController}