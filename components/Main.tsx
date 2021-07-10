import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/modules/main.module.css";
interface Props {}

export const Main: React.FC<Props> = () => {
  const [newdata, setNewData] = useState([]);
  const [result, setResult] = useState(null);
  const axiosFetch = () => {
    return axios
      .get(
        "https://api.tmdb.org/3/movie/popular?api_key=612d7335a1917606a44e125b8a761139"
      )
      .then((res) => {
        const data = res.data.results;
        console.log(data);
        return data;
      });
  };
  useEffect(() => {
    const mapData = async () => {
      const data = await axiosFetch();
      const returnFinalData = data.map((item) => (
        <div key={item.id} className={styles.item}>
          <h3>Movie : {item.title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={`${item.title}`}
          />
        </div>
      ));
      setNewData(returnFinalData);
    };
    mapData();
  }, []);
  return (
    <div>
      <div className={styles.container}>
        <button
          onClick={() => {
            axiosFetch;
            alert("Movies list logged to the console");
          }}
        >
          Get Movie List
        </button>
        <button
          onClick={() => {
            setResult(newdata);
          }}
        >
          Show everything
        </button>
      </div>
      <div className={styles.main}>{result ? newdata : null}</div>
    </div>
  );
};
