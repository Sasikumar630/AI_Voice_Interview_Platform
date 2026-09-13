import "./Categories.scss";
import interviewCategories from "../../data/interviewCategories";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();
  return (
    <section className="categories-page">

      <h1>Interview Categories</h1>

      <p>
        Choose a technology and start your AI interview.
      </p>

      <div className="category-grid">

        {interviewCategories.map((category) => (

          <div className="category-card" key={category.id}>

            <div className="category-icon">
              {category.icon}
            </div>

            <h2>{category.title}</h2>

            <p>{category.questions} Questions</p>

            <span>{category.level}</span>

           <button
    onClick={() =>
        navigate(`/interview/${category.title.toLowerCase()}`)
          }
          >
          Start Interview
              </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Categories;