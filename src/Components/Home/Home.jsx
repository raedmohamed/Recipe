import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.scss";

function Home() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllMeals();
    fetchCategories();
  }, []);

  const fetchAllMeals = () => {
    setLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals);
        setActiveCategory("All");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
        setLoading(false);
      });
  };

  const fetchCategories = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const fetchMealsByCategory = (category) => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals);
        setActiveCategory(category);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching category meals:", error);
        setLoading(false);
      });
  };

  const goToRecipeDetails = (mealId) => {
    navigate(`/recipe/${mealId}`);
  };

  return (
    <div className={style.mainHome}>
      <div className={style.header}>
        <p>Learn, Cook, Eat Your Food</p>
      </div>

      <div className={style.categories}>
        <button
          className={`${style.categoryButton} ${
            activeCategory === "All" ? style.active : ""
          }`}
          onClick={fetchAllMeals}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.idCategory}
            className={`${style.categoryButton} ${
              activeCategory === cat.strCategory ? style.active : ""
            }`}
            onClick={() => fetchMealsByCategory(cat.strCategory)}
          >
            {cat.strCategory}
          </button>
        ))}
      </div>

      {loading ? (
        <p className={style.loading}>Loading meals...</p>
      ) : (
        <div className={style.mealsGrid}>
          {meals.map((meal) => (
            <div key={meal.idMeal} className={style.mealCard}>
              <div className={style.imageContainer}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </div>
              <h3>{meal.strMeal}</h3>

              {meal.strArea ? (
                <p className={style.mealOrigin}>{meal.strArea}</p>
              ) : null}
              <button
                className={style.detailsButton}
                onClick={() => goToRecipeDetails(meal.idMeal)}
              >
                View Recipe
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
