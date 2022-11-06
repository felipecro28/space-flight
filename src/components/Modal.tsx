import { renderDateFormat } from "../services/functions";
import styles from "../styles/Modal.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai"

const Modal: React.FC = () => {
  const location = useLocation();
  const article = location.state;
  const navigate = useNavigate();

  return (
    <div className={styles.modal} >
      <AiOutlineClose onClick={() => navigate('/')} style={{position: "absolute", right: 15, cursor: 'pointer'}} />
      <div className={styles.cardImage}>
        <img src={article.imageUrl} />
      </div>
      <div className={styles.cardText}>
        <h3>{article.title}</h3>
        <div className={styles.dateText}>
          <p>{renderDateFormat(article.updatedAt)}</p>
        </div>
        <div className={styles.textParagraph}>
          <p>{article.summary}</p>
        </div>
      </div>
      <div className={styles.navSite}>
        <button>
          {" "}
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            href={article.url}
          >
            Ir para o site
          </a>
        </button>
      </div>
    </div>
  );
};

export default Modal;
