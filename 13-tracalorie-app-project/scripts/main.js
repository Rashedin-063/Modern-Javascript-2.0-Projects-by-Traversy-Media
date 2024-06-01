class CalorieTracker{
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit()
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed()
    this._displayCaloriesBurned()
    this._displayCaloriesRemaining()
  }

// public methods / api

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render()
  }
  
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render()
  }

  // Private Methods

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const caloriesLimitEl = document.getElementById('calories-limit');
    caloriesLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');

    const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);

    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned')
    const burned = this._workouts.reduce((total, meal) => total + meal.calories, 0);

    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining')
    const remaining = this._calorieLimit - this._totalCalories;

   caloriesRemainingEl.innerHTML = remaining;
  }

  _render() {
    this._displayCaloriesTotal()
    this._displayCaloriesConsumed()
    this._displayCaloriesBurned()
    this._displayCaloriesRemaining()
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 400);
const lunch = new Meal('lunch', 500)
tracker.addMeal(breakfast);
tracker.addMeal(lunch)


const yoga = new Workout('Yogasana', 200);
const walking = new Workout('evening walk', 70)
tracker.addWorkout(yoga)
tracker.addWorkout(walking)

console.log(tracker._meals, tracker._workouts)
console.log(tracker._totalCalories)

