import allData from "./datatest"

class Profile{


    //mongo
    getAllProfileFromMongo(){}

    getProfileByIdFromMongo(){}

    //staticdata
    getAllProfileFromStaticData(){
        return allData;
    }

    getProfileByIdStaticData(idRef: String){
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

    addProfileToStaticData(profile){
        allData.push(
            profile
        );

        return allData;
    }

}

//instancio la clase
const profileController = new Profile()

//exporto un objeto con dicha instancia. Podría agregar mas variables a la exportacion 
export {profileController}