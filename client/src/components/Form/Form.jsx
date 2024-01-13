import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions/index";
import style from "./form.module.css";


// import process from 'process';
// const {
//   URL_API_PI_POKEMONS,
//   // URL_API_PI_TYPES
// } = process.env;

export const URL_API_PI_POKEMONS= `http://localhost:3001/pokemons`;
const urlRegExp = /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;


const Form = () => {
  const dispatch = useDispatch();
  const options = useSelector((store) => store.types);

  const validate = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "El name es obligatorio";
    }
    if(!input.image){
      errors.image = 'Image is required';
    } else if (!urlRegExp.test(input.image)){
      errors.image = 'Image URL invalid';
    }

    return errors;
  };

  const [data, setData] = useState({
    name: "",
    vida: 0,
    fuerza: 0,
    defensa: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    tipos: [],
    image: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } =event.target;

    if (name !== "name") {
      setData({
        ...data,
        [name]: Number(value) <= 0 ? 0 : value,
      });
    } else {
      setErrors(
        validate({
          ...data,
          [name]: value,
        })
      );
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const checkbox = (event) => {
    const { value } =event.target;

    if (data.tipos.includes(value)) {
      data.tipos = data.tipos.filter((id) => id !== value);
      setData({
        ...data,
        tipos: data.tipos,
      });
    } else {
      setData({
        ...data,
        tipos: [...data.tipos, value],
      });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try{
      const crear = await fetch(`${URL_API_PI_POKEMONS}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      dispatch(getPokemons());
      const respuesta = await crear.json();
      console.log(respuesta);
      setData({
        name: "",
        vida: 0,
        fuerza: 0,
        defensa: 0,
        velocidad: 0,
        altura: 0,
        peso: 0,
        tipos: [],
        image:''
      });
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className={style.containerCreate}>
      <form action="POST" className={style.form} onSubmit={submit}>
        <div className={style.separado}>
          <h1>Crea tu propio Pokemon</h1>
          <p className={errors.name ? style.danger : style.question}>
            <label>Pokemon name</label>
            <input
              type="text"
              placeholder="pikachu.."
              name="name"
              value={data.name}
              onChange={handleInputChange}
              required
            />
          </p>
          {errors.name ? <p className="danger">{errors.username}</p> : null}
          <p className={style.question}>
            <label>Vida</label>
            <input
              type="number"
              name="vida"
              value={data.vida}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>Fuerza</label>
            <input
              type="number"
              name="fuerza"
              value={data.fuerza}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>Defensa</label>
            <input
              type="number"
              name="defensa"
              value={data.defensa}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>Velocidad</label>
            <input
              type="number"
              name="velocidad"
              value={data.velocidad}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>Altura</label>
            <input
              type="number"
              name="altura"
              value={data.altura}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>Peso</label>
            <input
              type="number"
              name="peso"
              value={data.peso}
              onChange={handleInputChange}
            />
          </p>

          <div className={style.question}>
            <div >
              <label >IMAGE:</label>
              <input 
                type="text" 
                name="image" 
                value={data.image}
                onChange={handleInputChange}
                placeholder="Link to image..."
              />
            </div> 
          </div>
          {errors.image ? 
            <p className="danger">{errors.image}</p> 
          : null}
        </div>

        <div className={style.hiddenCB}>
          <h1>Tipos</h1>
          <div className={style.tipos}>
            {options?.map((t) => (
              <div key={t.slot}>
                <input
                  type="checkbox"
                  name={t.name}
                  value={t.slot}
                  id={t.slot}
                  checked={data.tipos.includes(t.slot.toString())}
                  onChange={() => checkbox(t)}
                />
                <label htmlFor={t.slot}>{t.name}</label>
                {t.slot % 4 === 0 ? <br /> : null}
              </div>
            ))}
            <input type="submit" value="Crear" className={style.submit} />
          </div>
        </div>
      </form>
    </div>
  );
};


export default Form;