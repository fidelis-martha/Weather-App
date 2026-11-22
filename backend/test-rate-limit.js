
const axios = require("axios");

const testRateLimit = async () => {
  let successful = 0;
  let blocked = 0;

  for (let i = 1; i <= 105; i++) {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/weather?city=Burutu"
      );

      if (response.status === 200) {
        successful++;
      }
    } catch (error) {
      if (error.response?.status === 429) {
        blocked++;
      }
    }
  }

  console.log("Successful requests:", successful);
  console.log("Blocked requests:", blocked);
};

testRateLimit();
