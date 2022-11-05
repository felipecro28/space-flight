import { useEffect, useState } from "react";
import Header from "./components/Headers";
import { IArticle, listArticles } from "./services/api";

const Home: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([])
  const [limit, setLimit] = useState<number>(10)

  useEffect(() => {
    listArticles(limit)
      .then(({ data }) => {
        setArticles(data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <section>
        
      </section>
    </div>
  );
};

export default Home;
