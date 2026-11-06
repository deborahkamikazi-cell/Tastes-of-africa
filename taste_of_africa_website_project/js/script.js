const recipeData = [
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    location: "Nigeria & Ghana",
    region: "West Africa",
    time: "60 min",
    difficulty: "Medium",
    emoji: "🍛",
    gradient: ["#B85C38", "#E5A83B"],
    image: "Jollof rice.webp",
    description: "Smoky, tomato-rich rice slow-cooked with peppers and spice.",
    link: "recipes/jollof-rice.html",
  },
  {
    id: "injera",
    name: "Injera with Doro Wat",
    location: "Ethiopia",
    region: "East Africa",
    time: "90 min",
    difficulty: "Hard",
    emoji: "🥘",
    gradient: ["#69734B", "#B85C38"],
    image: "Injeri.jpg",
    description: "Spongy teff flatbread with a slow-simmered berbere chicken stew.",
    link: "recipes/injera.html",
  },
  {
    id: "isombe",
    name: "Isombe",
    location: "Rwanda",
    region: "East Africa",
    time: "75 min",
    difficulty: "Easy",
    emoji: "🥬",
    gradient: ["#69734B", "#3B241C"],
    image: "ISOMBE.jpg",
    description: "Cassava leaves stewed with eggplant and groundnuts.",
    link: "recipes/isombe.html",
  },
  {
    id: "moroccan-tagine",
    name: "Moroccan Tagine",
    location: "Morocco",
    region: "North Africa",
    time: "120 min",
    difficulty: "Medium",
    emoji: "🍲",
    gradient: ["#E5A83B", "#B85C38"],
    image: "tagine.webp",
    description: "Lamb slow-braised with apricots, preserved lemon and ras el hanout.",
    link: "recipes/moroccan-tagine.html",
  },
  {
    id: "bunny-chow",
    name: "Bunny Chow",
    location: "South Africa",
    region: "Southern Africa",
    time: "70 min",
    difficulty: "Easy",
    emoji: "🥖",
    gradient: ["#B85C38", "#3B241C"],
    image: "assets/Bunny-Chow.webp",
    description: "A hollowed loaf filled with fragrant Durban-style curry.",
    link: "recipes/bunny-chow.html",
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup",
    location: "Nigeria",
    region: "West Africa",
    time: "55 min",
    difficulty: "Medium",
    emoji: "🥘",
    gradient: ["#E5A83B", "#69734B"],
    image: "assets/Egusi-tripe.webp",
    description: "A rich, savory melon-seed soup with spinach and warm spices.",
    link: "recipes/jollof-rice.html",
  },
];

const storageKey = "tastes-of-africa-favorites";
const resolveAssetPath = (filename) => {
  const pagePath = window.location.pathname;

  if (filename.startsWith("assets/")) {
    if (pagePath.includes("/pages/recipes/")) {
      return `../../${filename}`;
    }
    if (pagePath.includes("/pages/")) {
      return `../${filename}`;
    }
    return filename;
  }

  if (pagePath.includes("/pages/recipes/")) {
    return `../../assets/images/${filename}`;
  }

  if (pagePath.includes("/pages/")) {
    return `../assets/images/${filename}`;
  }

  return `assets/images/${filename}`;
};

const getFavorites = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem(storageKey, JSON.stringify(favorites));
};

const renderRecipeCard = (recipe) => {
  const favorites = getFavorites();
  const isFavorited = favorites.includes(recipe.id);

  return `
    <article class="card" data-region="${recipe.region}">
      <div class="card-image ph" style="background: linear-gradient(135deg, ${recipe.gradient[0]}, ${recipe.gradient[1]});">
        ${recipe.image ? `<img class="card-thumb" src="${resolveAssetPath(recipe.image)}" alt="${recipe.name}" loading="lazy" />` : `<span aria-hidden="true">${recipe.emoji}</span>`}
        <button
          type="button"
          class="heart ${isFavorited ? "is-favorited" : ""}"
          data-recipe-id="${recipe.id}"
          aria-label="${isFavorited ? "Remove" : "Save"} ${recipe.name} from favorites"
          aria-pressed="${isFavorited}"
        >
          ${isFavorited ? "♥" : "♡"}
        </button>
      </div>
      <div class="card-body">
        <small>${recipe.location} · ${recipe.region}</small>
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>
        <div class="meta">⏱ ${recipe.time} · ${recipe.difficulty}</div>
        <a href="${recipe.link}" class="lnk">View Recipe →</a>
      </div>
    </article>
  `;
};

const initMenu = () => {
  const menu = document.getElementById("site-menu");
  const burger = document.querySelector(".burger");

  if (menu && burger) {
    burger.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });
  }
};

const initNewsletter = () => {
  const newsletterForm = document.querySelector(".newsletter-form");
  const newsletterStatus = document.getElementById("newsletter-status");

  if (!newsletterForm || !newsletterStatus) {
    return;
  }

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const emailValue = emailInput ? emailInput.value.trim() : "";

    if (!emailValue || !emailInput.checkValidity()) {
      newsletterStatus.textContent = "Please enter a valid email address.";
      return;
    }

    newsletterStatus.textContent = "Thank you for subscribing!";
    newsletterForm.reset();
  });
};

const initContactForm = () => {
  const contactForm = document.getElementById("contact-form");
  const successBox = document.getElementById("contact-success");

  if (!contactForm || !successBox) {
    return;
  }

  const validators = [
    {
      id: "full-name",
      errorId: "full-name-error",
      check: (value) => value.trim().length > 1,
      message: "Please enter your name.",
    },
    {
      id: "email",
      errorId: "email-error",
      check: (value) => /^\S+@\S+\.\S+$/.test(value.trim()),
      message: "Please enter a valid email address.",
    },
    {
      id: "country",
      errorId: "country-error",
      check: (value) => value.trim().length > 0,
      message: "Please choose a country.",
    },
    {
      id: "message",
      errorId: "message-error",
      check: (value) => value.trim().length > 20,
      message: "Your message must contain more than 20 characters.",
    },
  ];

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    validators.forEach(({ id, errorId, check, message }) => {
      const input = document.getElementById(id);
      const error = document.getElementById(errorId);
      const value = input ? input.value : "";
      const hasError = !check(value);

      if (input) {
        input.classList.toggle("input-error", hasError);
      }

      if (error) {
        error.textContent = hasError ? message : "";
      }

      if (hasError) {
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    const nameInput = document.getElementById("full-name");
    const name = nameInput ? nameInput.value.trim() : "friend";

    successBox.innerHTML = `<h3>Thank you, ${name}!</h3><p>Your message is on its way. We’ll reply within two working days.</p>`;
    successBox.classList.add("is-visible");
    contactForm.hidden = true;
  });
};

const initRecipesPage = () => {
  const recipeGrid = document.getElementById("recipe-grid");
  const recipeSearch = document.getElementById("recipe-search");
  const resultSummary = document.getElementById("recipe-results");
  const filterButtons = document.querySelectorAll(".filter-chip");

  if (!recipeGrid) {
    return;
  }

  let activeRegion = "All";
  let searchQuery = "";

  const applyFilters = () => {
    const filteredRecipes = recipeData.filter((recipe) => {
      const regionMatch = activeRegion === "All" || recipe.region === activeRegion;
      const searchMatch =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.region.toLowerCase().includes(searchQuery.toLowerCase());

      return regionMatch && searchMatch;
    });

    recipeGrid.innerHTML = filteredRecipes.map(renderRecipeCard).join("") || "<p>No recipes found. Try another region or search.</p>";
    bindFavoriteButtons();

    if (resultSummary) {
      resultSummary.textContent = `${filteredRecipes.length} recipe${filteredRecipes.length === 1 ? "" : "s"} found`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeRegion = button.dataset.region;
      filterButtons.forEach((chip) => {
        const isActive = chip === button;
        chip.classList.toggle("is-active", isActive);
        chip.setAttribute("aria-pressed", String(isActive));
      });
      applyFilters();
    });
  });

  if (recipeSearch) {
    recipeSearch.addEventListener("input", (event) => {
      searchQuery = event.target.value.trim();
      applyFilters();
    });
  }

  applyFilters();
};

const bindFavoriteButtons = () => {
  document.querySelectorAll(".heart").forEach((button) => {
    button.addEventListener("click", () => {
      const recipeId = button.dataset.recipeId;
      const currentFavorites = getFavorites();
      const isFavorite = currentFavorites.includes(recipeId);

      const updatedFavorites = isFavorite
        ? currentFavorites.filter((id) => id !== recipeId)
        : [...currentFavorites, recipeId];

      saveFavorites(updatedFavorites);

      const nextState = !isFavorite;
      button.classList.toggle("is-favorited", nextState);
      button.textContent = nextState ? "♥" : "♡";
      button.setAttribute("aria-pressed", String(nextState));
      button.setAttribute(
        "aria-label",
        `${nextState ? "Remove" : "Save"} ${button.closest(".card")?.querySelector("h3")?.textContent || "recipe"} from favorites`
      );
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initNewsletter();
  initContactForm();
  initRecipesPage();
  bindFavoriteButtons();
});
