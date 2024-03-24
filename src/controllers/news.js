const { errorCode } = require('../utils/errorCode');

const newsCache = {};

const getUserPreference = async (req, res) => {
    const user = users.find(user => user.username === req.user.username);
    if (user) {
        return res.json(user.preferences);
    } else {
        return res.status(404).send(errorCode.userNotFound);
    }
}

const updateUserPreference = async (req, res) => {
    const user = users.find(user => user.username === req.user.username);
    if (user) {
        user.preferences = req.body.preferences;
        res.status(204).send('Preferences Got Updated');
    } else {
        res.status(404).send(errorCode.userNotFound);
    }
}

const fetchNews = async (req, res) => {
    const user = users.find(user => user.username === req.user.username);
    if (!user) {
        return res.status(404).send(errorCode.userNotFound);
    }

    try {
        const news = await fetchNews(user.preferences);
        res.json(news);
    } catch (error) {
        res.status(500).send(errorCode.errorNews);
    }
}

async function fetchNews(preferences) {
    const promises = preferences.map(async preference => {
        if (newsCache[preference]) {
            return newsCache[preference];
        } else {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${preference}&apiKey=your-api-key`);
            newsCache[preference] = response.data.articles;
            return response.data.articles;
        }
    });

    return Promise.all(promises);
}

module.exports = {
    getUserPreference, updateUserPreference, fetchNews
}

