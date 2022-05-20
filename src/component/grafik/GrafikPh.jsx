import React, { useEffect, useMemo, useState } from "react";
import "./grafikStyles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  PointElement,
  Legend,
  TimeSeriesScale,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

ChartJS.register(
  CategoryScale,
  Filler,
  TimeSeriesScale,
  TimeScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  PointElement,
  Legend
);

export default function GrafikPh() {
  const [dataPh, setData] = useState([]);
  useEffect(() => {
    fetchDataPh();
    let intervalPh = setInterval(fetchDataPh, 5000);
    return function () {
      clearInterval(intervalPh);
    };
  }, []);

  function fetchDataPh() {
    fetch("https://primus.somee.com/getPhValue")
      .then((res) => res.json())
      .then((hasil) => setData(hasil))
      .catch((err) => console.log(err));
  }

  const dataGrafik = {
    labels: [],
    datasets: [
      {
        label: "Nilai pH Tambak ",
        data: [],
        fill: true,
        borderColor: "#ff6600",
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return;
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "#ff4040");
          gradient.addColorStop(0.5, "#ff4c29");
          gradient.addColorStop(1, "#f6546a88");

          return gradient;
        },
        borderWidth: 1,
        pointBorderWidth: 0,
        border: false,
        hoverPointBorderWidth: 4,
      },
    ],
  };
  useMemo(() => {
    dataGrafik.datasets[0].data = dataPh.map((dt) => dt.nilaiPh);
    dataGrafik.labels = dataPh.map((dt) => {
      const x = parseISO(dt.waktu_input);
      return format(x, "eeeeeeeeee, d MMM, yyyy ( hh:mm:ss )", {
        locale: id,
      });
    });
    // eslint-disable-next-line
  }, [dataPh]);

  const getLabel = (item, index) => {
    if (index <= 2) {
      return item.length === 4 ? item.slice(0, 3) : item;
    }
  };

  return (
    <div className="wrapper-chart">
      <div className="chart-ph">
        <Line
          id="ChartPhRes"
          options={{
            maintainAspectRatio: false,
            elements: {
              line: {
                fill: true,
                backgroundColor: "rgba(25, 25, 25, 0.8)",
                tension: 0.2,
              },
              point: {
                radius: 0,
              },
            },
            interaction: {
              intersect: false,
            },
            responsive: true,
            color: "#d2d2d2",
            scales: {
              y: {
                grid: {
                  color: "#2d407d59",
                },
                ticks: {
                  padding: 10,
                  labelOffset: 8,
                  align: "end",
                  color: "#d2d2d2",
                },
              },
              x: {
                grid: {
                  color: "#2d407d59",
                  tickColor: "transparent",
                },
                ticks: {
                  padding: 7,
                  color: "#d2d2d2",
                  autoSkip: true,
                  display: true,
                  align: "start",
                  maxTicksLimit: 3,
                  labelOffset: 2,
                  crossAlign: "near",
                  maxRotation: 0,
                  callback: function (val) {
                    // Hide every 2nd tick label
                    let label = this.getLabelForValue(val).split(" ");
                    label = label.map(getLabel);
                    return label.join(" ");
                  },
                },
              },
            },
            plugins: {
              legend: {
                position: "top",

                labels: {
                  boxWidth: 15,
                  boxHeight: 15,
                  boxPadding: 10,
                },
              },
              title: {
                display: true,
                text: "Grafik Nilai pH Air Tambak Ikan Bandeng",
                color: "#d2d2d2",
              },
              tooltip: {
                padding: 10,
                bodyFont: {
                  weight: 500,
                  size: 13,
                  lineHeight: 2,
                },
              },
            },
          }}
          data={dataGrafik}
        />
      </div>
    </div>
  );
}
