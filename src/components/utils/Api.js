export const getIngredients = () => {
  //   return fetch("https://norma.nomoreparties.space/api/ingredients").then((res)=>(res.ok ? res.json().data : Promise.reject(console.log(res))));
  return fetch("https://norma.nomoreparties.space/api/ingredients").then(
    (res) => (res.ok ? res.json() : Promise.reject(res.status))
  );
};
