import { Injectable } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  get dailyVolumeChartOption(): ChartOptions {
    return {
      responsive: true,
      aspectRatio: 2.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
          enabled: false,
          itemSort: function (a, b) {
            return b.datasetIndex - a.datasetIndex
          },
          external: function (context: any) {
            // Tooltip Element
            let tooltipEl: any = document.getElementById('chartjs-tooltip');

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            const tooltipModel: any = context.tooltip;
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            function getBody(bodyItem: any) {
              return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
              const bodyLines = tooltipModel.body.map(getBody);
              let innerHtml = '<tbody>';
              bodyLines.forEach(function (body: any, i: any) {
                const colors = tooltipModel.labelColors[i];
                let style = 'background:' + colors.backgroundColor;
                style += '; width: 12px';
                style += '; height: 12px';
                style += '; border-radius: 4px';
                style += '; display: inline-block';
                style += '; margin-right: 10px';
                const colorMarker = '<div style="' + style + '"></div>';
                innerHtml += '<tr><td>' + colorMarker + body + '</td></tr>';
              });
              innerHtml += '</tbody>';

              let tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }

            // Display, position, and set styles for font
            const position = context.chart.canvas.getBoundingClientRect();
            tooltipEl.style.opacity = 1;
            tooltipEl.style.backgroundColor = '#181818';
            tooltipEl.style.color = '#ffffff';
            tooltipEl.style.padding = '0px 17px';
            tooltipEl.style.borderRadius = '5px';
            tooltipEl.style.fontWeight = '600';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            tooltipEl.style.pointerEvents = 'none';
          }
        },
        legend: {
          display: false,
        },
      },
      scales: {
        X: {
          stacked: true,
          ticks: {

            color: 'rgba(24, 24, 24, 0.4)',
          },
          grid: {
            display: false,

          },
        },
        y: {
          stacked: true,
          ticks: {
            color: 'rgba(24, 24, 24, 0.4)',
          },
          grid: {
            display: false,
            color: '#F9F9F9',

          },
        },
      },
    };
  }
  get dailyOpenRateChartOption(): ChartOptions {
    return {
      responsive: true,
      aspectRatio: 2.8,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            labelColor: function (context) {
        
              return {
                borderColor: '#334bfa',
                backgroundColor: '#334bfa',
                borderRadius: 2,
                borderWidth: 3,
              };
            },
            labelTextColor: function (context) {
              return '#ffffff';
            },
          },
        },
      },
      scales: {
        X: {
          ticks: {
            color: 'rgba(24, 24, 24, 0.4)',
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: 'rgba(24, 24, 24, 0.4)',
          },
          grid: {
            display: true,
            color: '#F9F9F9',
            drawBorder: false,
          },
        },
      },
    }
  }


  get getDailyLinkClickedChart(): ChartOptions {

    return {
      aspectRatio: 2.8,
      hover: {
        mode: 'nearest',
        intersect: true
      },
      
      scales: {
        y: {
          min: 0,
          grid: {
            // tickColor: {},
            // display: true,
            drawBorder: false,
          },

        },
        x: {
          grid: {
            color: 'rgba(24, 24, 24, 0.05)',
            borderWidth: 1,
            display: false,
          }
        },
      },
      
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 2,
        },
        point: {
          radius: 0,
        },
      },
      responsive: true,
      
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          enabled: false,

          external: function (context: any) {
            // Tooltip Element
            let tooltipEl: any = document.getElementById('chartjs-tooltip');

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            const tooltipModel: any = context.tooltip;
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            function getBody(bodyItem: any) {
              return bodyItem.lines;
            }

           let  colorSelections: string[] = [
              '#334BFA', '#FA336F', '#FFCE56', '#E7E9ED', '#444444',
              '#83CC8B', '#61C76C', '#20C933', '#00B514', '#338A17',
              '#AFB5FF', '#8E96FF', '#6B76FF', '#3140FF', '#0013FF',
              '#FFB598', '#FF9E79', '#FF7844', '#FF4700', '#C53700',
              '#FF9FF2', '#FE67E9', '#F638DC', '#FF00DC', '#D600B8',
              '#FFE3AF', '#FFD68C', '#FFC55C', '#FDB22B', '#E89500',
              '#FFB3C8', '#FF8CAD', '#FF4E81', '#FF0049', '#DA0240',
              '#C2F5E9', '#72DDC3', '#20D9D2', '#7BC8C3', '#06A09B',
              '#D0F0FD', '#77D1F3', '#18BFFF', '#4083AC', '#0B76B7',
              '#CFDFFF', '#9CC7FF', '#2D7FF9', '#0067FF', '#0054D1'
            ]
          

            // Set Text
            if (tooltipModel.body) {
              const bodyLines = tooltipModel.body.map(getBody);
              let innerHtml = '<tbody>';
              bodyLines.forEach(function (body: any, i: any) {
                const colors = tooltipModel.labelColors[i];
                let style = 'background:' + colorSelections[i];
                style += '; width: 12px';
                style += '; height: 12px';
                style += '; border-radius: 4px';
                style += '; display: inline-block';
                style += '; margin-right: 6px';
                style += '; margin-right: 10px';
                const colorMarker = '<div style="' + style + '"></div>';
                innerHtml += '<tr><td>' + colorMarker + body + '</td></tr>';
              });
              innerHtml += '</tbody>';

              let tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }

            // Display, position, and set styles for font
            const position = context.chart.canvas.getBoundingClientRect();
            tooltipEl.style.opacity = 1;
            tooltipEl.style.backgroundColor = '#181818';
            tooltipEl.style.color = '#ffffff';
            tooltipEl.style.padding = '0px 20px';
            tooltipEl.style.borderRadius = '5px';
            tooltipEl.style.fontWeight = '600';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 10 + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 10 + 'px';
            tooltipEl.style.pointerEvents = 'none';
          }
        }

      }
    }
  }




  
  get openRateChartOption(): ChartOptions {
    return {
      aspectRatio: 2.8,
      hover: {
        mode: 'index',
        intersect: false
      },
      scales: {
        X: {
          ticks: {
            color: 'rgba(24, 24, 24, 0.4)',
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: 'rgba(24, 24, 24, 0.4)',
          },
          grid: {
            display: true,
            color: '#F9F9F9',
          },
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          enabled: false,
          external: function (context: any) {
            // Tooltip Element
            let tooltipEl: any = document.getElementById('chartjs-tooltip');

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            const tooltipModel: any = context.tooltip;
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            function getBody(bodyItem: any) {
              return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
              const bodyLines = tooltipModel.body.map(getBody);
              let innerHtml = '<tbody>';
              bodyLines.forEach(function (body: any, i: any) {
                const colors = tooltipModel.labelColors[i];
                let style = 'background:' + colors.backgroundColor;
                style += '; width: 12px';
                style += '; height: 12px';
                style += '; border-radius: 4px';
                style += '; display: inline-block';
                style += '; margin-right: 6px';
                style += '; margin-right: 10px';
                const colorMarker = '<div style="' + style + '"></div>';
                innerHtml += '<tr><td>' + colorMarker + body + '</td></tr>';
              });
              innerHtml += '</tbody>';

              let tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }

            // Display, position, and set styles for font
            const position = context.chart.canvas.getBoundingClientRect();
            tooltipEl.style.opacity = 1;
            tooltipEl.style.backgroundColor = '#181818';
            tooltipEl.style.color = '#ffffff';
            tooltipEl.style.padding = '0px 20px';
            tooltipEl.style.borderRadius = '5px';
            tooltipEl.style.fontWeight = '600';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 10 + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 10 + 'px';
            tooltipEl.style.pointerEvents = 'none';
          }
        }

      }

    }
  }
}
