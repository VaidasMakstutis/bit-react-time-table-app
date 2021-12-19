import firebase from "../firebaseConfig";

export const getAllCompanies = (onCompanyChanged) => {
  firebase
    .firestore()
    .collection("companies-table")
    .onSnapshot((snapshot) => {
      const newCompany = snapshot.docs.map(doc => ({
        companyId: doc.id,
        ...doc.data()
      }))
      onCompanyChanged(newCompany);
    })
}

export const addCompany = (companies) => {
  firebase
    .firestore()
    .collection("companies-table")
    .add(companies)
}

export const showCompanyById = (company, companyId) => {
  firebase
      .firestore()
      .collection('companies-table')
      .doc(companyId)
      .get()
      .then((docRef)=>{company(docRef.data())})
}

export const deleteCompany = (companyId) => {
   firebase
     .firestore()
     .collection("companies-table")
     .doc(companyId)
     .delete()
}
