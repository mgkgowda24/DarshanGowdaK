let page = 1;
let perPage = 10;
let total = 0;
let currentTab = 'your';

function filterCards(tab) {
  currentTab = tab;
  page = 1;
  loadCards();
}

function loadCards() {
  const cardList = document.getElementById('card-list');
  const loading = document.getElementById('loading');
  cardList.innerHTML = '';
  loading.style.display = 'block';

  // Simulating API call with mock data
  const mockAPIResponse = {
    data: [
      {
        name: 'Mixmax',
        budget_name: 'Software subscription',
        owner_id: 1,
        spent: {
          value: 100,
          currency: 'SGD'
        },
        available_to_spend: {
          value: 1000,
          currency: 'SGD'
        },
        card_type: 'burner',
        expiry: '9 Feb',
        limit: 100,
        status: 'active'
      },
      {
        name: 'Quickbooks',
        budget_name: 'Software subscription',
        owner_id: 2,
        spent: {
          value: 50,
          currency: 'SGD'
        },
        available_to_spend: {
          value: 250,
          currency: 'SGD'
        },
        card_type: 'subscription',
        limit: 10,
        status: 'active'
      }
    ],
    page: 1,
    per_page: 10,
    total: 100
  };

  // Filter cards based on current tab and owner_id
  const filteredCards = mockAPIResponse.data.filter(card => {
    if (currentTab === 'your') {
      return card.owner_id === 1; // Change owner_id based on your scenario
    } else if (currentTab === 'all') {
      return true;
    } else if (currentTab === 'blocked') {
      return card.status === 'blocked';
    }
  });

  // Pagination
  total = filteredCards.length;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedCards = filteredCards.slice(start, end);

  // Display cards
  paginatedCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';

    const cardTypeElement = document.createElement('div');
    cardTypeElement.className = 'card-type';
    cardTypeElement.innerText = card.card_type;

    const cardDetailsElement = document.createElement('div');
    cardDetailsElement.className = 'card-details';

    const nameElement = document.createElement('p');
    nameElement.innerHTML = `<strong>Name:</strong> ${card.name}`;

    const budgetNameElement = document.createElement('p');
    budgetNameElement.innerHTML = `<strong>Budget Name:</strong> ${card.budget_name}`;

    const limitElement = document.createElement('p');
    limitElement.innerHTML = `<strong>Limit:</strong> ${card.limit}`;

    if (card.card_type === 'burner') {
      const expiryElement = document.createElement('p');
      expiryElement.innerHTML = `<strong>Expiry:</strong> ${card.expiry}`;
      cardDetailsElement.appendChild(expiryElement);
    }

    if (card.card_type === 'subscription') {
      const spentElement = document.createElement('p');
      spentElement.innerHTML = `<strong>Spent:</strong> ${card.spent.value} ${card.spent.currency}`;
      cardDetailsElement.appendChild(spentElement);
    }

    cardDetailsElement.appendChild(nameElement);
    cardDetailsElement.appendChild(budgetNameElement);
    cardDetailsElement.appendChild(limitElement);

    cardElement.appendChild(cardTypeElement);
    cardElement.appendChild(cardDetailsElement);
    cardList.appendChild(cardElement);
  });

  loading.style.display = 'none';
}

// Infinite Scroll
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if ((page * perPage) < total) {
      page++;
      loadCards();
    }
  }
});

// Initial load
loadCards();
