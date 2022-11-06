import { useEffect, useState } from "react";
import Header from "./Headers";
import { IArticle, listArticles } from "../services/api";
import { renderDateFormat } from "../services/functions";
import styles from "../styles/Home.module.css";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [hasModal, setHasModal] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = () => {
    listArticles(limit)
      .then(({ data }) => {
        setArticles(data);
      })
      .catch((err) => console.log(err));
  };

  const filterArticles = (word: string) => {
    if (word === "") {
      fetchData();
    }
    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(word.toLowerCase())
    );
    setArticles(filteredArticles);
  };

  const filterByDate = (param: string) => {
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

  const openModal = (article: IArticle, index: number) => {
    setHasModal(index);
    navigate({ pathname: "modal" }, { state: article });
  };

  const renderComponent = (article: IArticle, index: number) => {
    return (
      <div key={index} className={styles.mainContent}>
        {index === hasModal ? (
          <div className={styles.containModal}>
            <Outlet />
          </div>
        ) : null}
        <div

          className={index % 2 === 0 ? styles.card : styles.cardReverse}
          style={hasModal != null ? { opacity: 0.3 } : {}}
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
            <button
              onClick={() => openModal(article, index)}
              className={styles.seeMore}
            >
              Ver Mais
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    location.pathname === '/' ? setHasModal(null) : null
  }, [location]);

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
