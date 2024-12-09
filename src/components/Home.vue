<template>
  <div>
    <svg id="coordinatePlane" width="500" height="500" @click="onSvgClick"></svg>
    <div>
      <label>X:</label>
      <input type="text" v-model="xInput" placeholder="-3 ... 3" />
    </div>
    <div>
      <label>Y:</label>
      <input type="text" v-model="yInput" placeholder="-3 ... 5" />
    </div>
    <div>
      <label>R:</label>
      <input type="text" v-model="rInput" placeholder="1 ... 5" />
    </div>

    <button class="redraw-button" @click="validateAndRedraw">Redraw Plane</button>
    <button class="send-button" @click="sendPointButton">Send</button>
    <button class="clear-button" @click="clearAllPoints">Clear All Points</button>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <label class="table-label">Points Table</label>
    <table border="1">
      <thead>
      <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Hit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="point in points" :key="point.id">
        <td>{{ point.x }}</td>
        <td>{{ point.y }}</td>
        <td>{{ point.r }}</td>
        <td :style="{ color: point.hit ? 'green' : 'red' }">
          {{ point.hit ? 'Yes' : 'No' }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { redrawCoordinatePlane, drawPoint } from "../utils/CoordinatePlane";
import { getRandomColor } from "../utils/GenerateColors";

export default {
  data() {
    return {
      xInput: '',
      yInput: '',
      rInput: '',
      points: [],
      rValue: 1,
      errorMessage: '',
    };
  },
  mounted() {
    getRandomColor();
    redrawCoordinatePlane();
  },
  methods: {
    // Обработка клика по SVG
    async onSvgClick(event) {
      const svg = document.getElementById("coordinatePlane");
      const pt = svg.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;

      const cursorPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

      const x = (cursorPoint.x - 250) / (50);
      const y = -(cursorPoint.y - 250) / (50);

      await this.sendPointToServer(x * this.rValue, y * this.rValue);
    },

    // Отправка точки на сервер
    async sendPointToServer(x, y) {
      try {
        this.errorMessage = "";
        const response = await axios.post("http://localhost:8080/api/check-point", {
          x: x.toFixed(2),
          y: y.toFixed(2),
          r: this.rValue,
        });

        const result = response.data;

        this.points.unshift({
          id: this.points.length + 1,
          x: (result.x).toFixed(2),
          y: (result.y).toFixed(2),
          r: this.rValue,
          hit: result.hit,
        });

        drawPoint(result.x / (this.rValue * this.rValue), result.y / (this.rValue * this.rValue), result.hit ? "green" : "red", this.rValue);
      } catch (error) {
        this.errorMessage = "Ошибка отправки данных на сервер. Проверьте соединение.";
        console.error(error);
      }
    },


    async sendPointButton() {
      if (!this.validateInputs()) {
        return;
      }

      const x = parseFloat(this.xInput);
      const y = parseFloat(this.yInput);
      const r = parseFloat(this.rInput);

      await this.sendPointToServer(x, y);
    },

    async clearAllPoints() {
      try {
        await axios.delete("http://localhost:8080/api/clear-points");
        this.points = [];
        redrawCoordinatePlane(this.rValue);
        this.errorMessage = ''; // Сбрасываем ошибку после успешной очистки
      } catch (error) {
        this.errorMessage = "Ошибка очистки точек. Проверьте соединение с сервером.";
        console.error(error);
      }
    },

    validateInputs() {
      const x = parseFloat(this.xInput);
      const y = parseFloat(this.yInput);
      const r = parseFloat(this.rInput);

      if (isNaN(x) || x < -3 || x > 3) {
        this.errorMessage = "X должен быть числом в диапазоне от -3 до 3.";
        return false;
      }
      if (isNaN(y) || y < -3 || y > 5) {
        this.errorMessage = "Y должен быть числом в диапазоне от -3 до 5.";
        return false;
      }
      if (isNaN(r) || r < 1 || r > 5) {
        this.errorMessage = "R должен быть числом в диапазоне от 1 до 5.";
        return false;
      }

      this.errorMessage = '';
      this.rValue = r;
      return true;
    },

    validateAndRedraw() {
      const r = parseFloat(this.rInput);
      if (isNaN(r) || r < 1 || r > 5) {
        this.errorMessage = "R должен быть числом в диапазоне от 1 до 5.";
        return false;
      } else {
        this.errorMessage = '';
        this.rValue = r;
        redrawCoordinatePlane(this.rValue);
        this.rescalePoints();
      }
    },

    rescalePoints() {
      redrawCoordinatePlane(this.rValue);

      this.points.forEach((point) => {
        drawPoint(point.x / (this.rValue * this.rValue), point.y / (this.rValue * this.rValue), point.hit ? "green" : "red", this.rValue);
      });
    },
  },
};
</script>

<style scoped>
.table-label {
  transform: translate(10px, 3px);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: center;
  padding: 0.5rem;
}

.clear-button,
.send-button,
.redraw-button {
  padding: 0.5rem 1rem;
  margin: 0.6rem;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
