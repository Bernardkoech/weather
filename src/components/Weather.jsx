import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import {
  FaTemperatureLow,
  FaWind,
  FaTint,
  FaThermometer,
} from "react-icons/fa";
import "./Weather.css"; // Import custom styles

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countryName, setCountryName] = useState(null); // State to store country name

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=69c6a79058586e8d150707e24f6aa169`
      );

      setWeatherData(response.data);

      // Fetch country name based on country code
      const countryResponse = await axios.get(
        `https://restcountries.com/v3/alpha/${response.data.sys.country}`
      );
      setCountryName(countryResponse.data[0].name.common);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <Container fluid className="weather-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="weather-card">
            <h1 className="text-center mb-4">Weather App</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="w-100"
              >
                {loading ? "Loading..." : "Get Weather"}
              </Button>
            </Form>

          </div>
        </Col>
      </Row>
      {weatherData && (
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={6}>
            <Card className="weather-data-card">
              <Card.Body>
                <h2 className="text-center">
                  {weatherData.name}, {countryName} {/* Display country name */}
                </h2>

                <p>
                  <FaThermometer /> Temperature: {weatherData.main.temp}°C
                </p>
                <p>
                  <FaTint /> Description: {weatherData.weather[0].description}
                </p>
                <p>
                  <FaTemperatureLow /> Feels like: {weatherData.main.feels_like}
                  °C
                </p>
                <p>
                  <FaTint /> Humidity: {weatherData.main.humidity}%
                </p>
                <p>
                  <FaWind /> Wind Speed: {weatherData.wind.speed}m/s
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      {loading && (
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={6}>
            <p className="text-center">Loading weather data...</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Weather;
