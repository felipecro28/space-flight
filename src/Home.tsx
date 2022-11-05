import { useEffect, useState } from "react";
import Header from "./components/Headers";
import { IArticle, listArticles } from "./services/api";
import styles from "./styles/Home.module.css";

const Home: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [date, setDate] = useState<string>('');
  const [filter, setFilter] = useState('')

  const fetchData = () => {
    listArticles(limit)
      .then(({ data }) => {
        setArticles(data);
      })
      .catch((err) => console.log(err));
  };

  const updateDate = () => {
    alert('bateu')
  }

  const renderDateFormat: (date: string) => string = (date: string) => {
    const dateFormat = new Date(date);
    return `${dateFormat.getDay()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}`;
  };

  const filterArticles = (word: string) => {
    setFilter(word)
    if (word === "") {
      fetchData();
    }
    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(word.toLowerCase())
    );
    setArticles(filteredArticles);
  };

  const filterByDate = (param: string) => {
    setDate(param);
    const newest = articles.sort(function (a, b) {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    if (param === "Mais Antigas") {
      setArticles([...newest].reverse());
    } else if (param === "Mais Recentes") {
      setArticles([...newest]);
    }
    return;
  };

  const clearDate = () => {
    alert('oi')
  }

  const renderComponent = (article: IArticle, index: number) => {
    return (
      <div
        key={index}
        className={index % 2 === 0 ? styles.card : styles.cardReverse}
      >
        <div className={styles.cardImage}>
          <img src={article.imageUrl} />
        </div>
        <div className={styles.cardText}>
          <h3>{article.title}</h3>
          <div className={styles.dateText}>
            <p>{renderDateFormat(article.updatedAt)}</p>
            <button>
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                href={article.url}
              >
                News Site
              </a>
            </button>
          </div>
          <div className={styles.textParagraph}>
            <p>{article.summary}</p>
          </div>
          <button className={styles.seeMore}>Ver Mais</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  return (
    <div className={styles.homeContent}>
      <Header filterSearch={filterArticles} dateSearch={filterByDate} />
      <section>
        {articles.map((article, index) => renderComponent(article, index))}
      </section>
      <div className={styles.loadMore}>
        <div className={styles.squareDiv}></div>
        <div className={styles.squareDiv}></div>
        <div className={styles.squareDiv}></div>
        <button onClick={() => setLimit(limit + 10)}>Carregar mais</button>
      </div>
    </div>
  );
};

export default Home;
