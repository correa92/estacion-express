import { useEffect, useState } from "react";
import InstagramCard from "../InstagramCard/InstagramCard";

export default function Home() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {

    const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,permalink,thumbnail_url,timestamp,username&access_token=${import.meta.env.VITE_INSTAGRAM_TOKEN}`;
    fetch(url)
      .then((res) => {
        const resultado = res.json();
        return resultado;
      })
      .then((r) => {
        setPublications(r.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>ESTACIÓN EXPRESS</h1>
      <InstagramCard list={publications} />
    </div>
  );
}
