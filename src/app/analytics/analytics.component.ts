import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts'
import { cardDataService } from '../cardData.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  public uniqueAssignedToArray: any;
  public numericEstimatedPriceArray:any
  constructor(private cardDataService: cardDataService) {
    setTimeout(() => {
      console.log("inside analytics",cardDataService.cardData);

      const uniqueAssignedTo = new Set();
      const uniqueEstimatedPrice = new Set();

      // Iterate through the items array
      this.cardDataService.cardData.forEach((item) => {
        uniqueAssignedTo.add(item.assignedTo); // Add assignedTo value to the Set for assignedTo
        uniqueEstimatedPrice.add(item.estimatedPrice); // Add estimatedPrice value to the Set for estimatedPrice
      });

      // Convert Sets back to arrays
      this.uniqueAssignedToArray = Array.from(uniqueAssignedTo);
      const uniqueEstimatedPriceArray = Array.from(uniqueEstimatedPrice);
      this.numericEstimatedPriceArray = uniqueEstimatedPriceArray.map((value) => Number(value));
            this.loadBarChart();
            this.loadLineChart();
            this.loadPieChart();
    }, 2000);
    
  }

  ngOnInit() {
    
  }

  loadBarChart() {
    var options = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'sales',
        data: this.numericEstimatedPriceArray
      }],
      xaxis: {
        categories: this.uniqueAssignedToArray
      }
    }
    
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    
    chart.render();
  }

  loadLineChart() {
    var options = {
      series: [{
        name: "Desktops",
        data: this.numericEstimatedPriceArray
    }],
      chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: this.uniqueAssignedToArray
    }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  
  
  }

  loadPieChart() {
    var options = {
      series: this.numericEstimatedPriceArray,
      chart: {
      width: 380,
      type: 'pie',
    },
    labels: this.uniqueAssignedToArray,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  
  
  }

}
