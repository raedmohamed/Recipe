import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./RecipeDetails.module.scss";

function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMeal(data.meals[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meal details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!meal) return <p>Meal not found</p>;

  return (
    <div className={style.recipeDetails}>
      <h1>{meal.strMeal}</h1>

      <div className={style.recipeContent}>
        <div className={style.recipeImage}>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>

        <div className={style.recipeInfo}>
          <h2>Ingredients:</h2>
          <table className={style.ingredientsTable}>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Measure</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                return ingredient && measure ? (
                  <tr key={i}>
                    <td>{ingredient}</td>
                    <td>{measure}</td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>

          <h2>Instructions:</h2>
          <p>{meal.strInstructions}</p>

          <div className={style.links}>
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className={style.linkButton}
              >
                Watch on YouTube
              </a>
            )}

            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className={style.linkButton}
              >
                View Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
