import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import * as Highcharts from 'highcharts';

import * as moment from 'moment';

import {MatDialog} from '@angular/material/dialog';
import {StatsService} from '../../services/stats/stats.service';
import {UserService} from '../../services/user/user.service';
import {OrderService} from '../../services/order/order.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
    
    public Highcharts = Highcharts;
    
    public ordersChartOptions:any;
    public ordersChartInstance:any;
    public updateOrdersFlag:boolean = false;  
    
    public pieChartOptions:any;
    public pieChartInstance:any;
    public updatePieChartFlag:boolean = false;  

    public statsTimeframes:any;
    public totalOrders:number;
    
    public orders:Array<any>;
    public users:Array<any>;

    constructor(public dialog: MatDialog, private statsService:StatsService, public userService: UserService, public orderService: OrderService) { 
        
        this.ordersChartOptions = this.getChartConfig();
        this.pieChartOptions = this.getPieChartConfig();
        
        this.statsTimeframes = 30;
        this.totalOrders = 0;

        this.users = [];
        this.orders = [];    

        this.getStats();
            
            
            
    }
    
    
    private getStats(){
        this.changeTimeframe(30);
        
        this.userService.getUsers({page:1, limit:4, search:"", order:"", order_by:"", group_id:""}).toPromise().then((data) => {
            this.users = data.data;
        })  
        
        this.orderService.getOrders({page:1, limit:10, search:"", order:"", order_by:"", group_id:""}).toPromise().then((data) => {
            this.orders = data.data;
        })                 
    }
    
    
    public changeTimeframe(timeframe){
        this.statsTimeframes = timeframe;
        this.statsService.getStats(timeframe).toPromise().then((data) => {
            this.ordersChartOptions.series = 
                [{
                    name: 'Orders',
                    data: this.formatStats(data),
                    color:"#00798d"
                }];  
                
                
                this.updateOrdersFlag = true;     
                
            let total = 0;    
            for (let item of data){
                total += parseInt(item.y);
            }  
            
            this.totalOrders = total;  
                       
        })
    }
    

    
       
    private getChartConfig(){
        return         {
            chart:{
              type: 'areaspline',
              backgroundColor:"transparent",
              spacingBottom:0,
              spacingTop:0,
              spacingLeft:0,
              spacingRight:0
              },
              yAxis: {
                  visible:true,
                  gridLineColor:"rgba(0, 0, 0, 0.05)",
                  gridZIndex:-1,
                  labels:{
                      format:"{value}",
                      distance:-25,
                      padding:5,                      
                      x:40,
                      y:-12,
                      align:"left",
                    style: {
                        color: 'rgba(0, 0, 0, 0.30)'},
                    },
                  title: {enabled:false}
              },
              xAxis: {
                  visible:false,
                  
              },
              legend:{
                  enabled:false
              },
              time:{
                  useUTC:false
                },             
              credits:false,
              title:"",
              tooltip: {
                  useShared:true,
                  useHTML: true,
                    formatter: function () {
                        return '<span style="font-size: 10px">' + Highcharts.dateFormat('%B %e, %Y', this.x) + '</span><br/>' + 
                            '<span style="color:' + this.point.color + '">\u25CF</span> ' + this.series.name + ': <b>' + Highcharts.numberFormat(this.y, 0) + '</b>';
                    }
              },
              plotOptions:{
                  series: {
                      marker: {
                          enabled:false
                      },
                      fillOpacity: 0.2
                  }
              },
            series: []
        };
        
    }

    private getPieChartConfig(){
        
// Define the base color
var baseColor = "#2C8654";

// Calculate the lighter and darker shades of the base color
var lighterColor = Highcharts.color(baseColor).brighten(0.2).get();
var darkerColor = Highcharts.color(baseColor).brighten(-0.2).get();

// Define the custom color array for the pie slices
var customColors = [baseColor, lighterColor, darkerColor];        
        
        
        return        {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            colors: customColors,
            innerSize: 200,
            allowPointSelect: false,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: false
        }
    },
    credits:false,
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Other',
            y: 7.05
        }]
    }],
    // Add center text
    annotations: [{
        labels: [{
            point: {
                x: 0.5,
                y: 0.5,
                xAxis: 0,
                yAxis: 0
            },
            text: 'Center Text',
            style: {
                fontSize: '16px'
            }
        }]
    }]
};
        
    }
    
        
    private formatStats(data){
        let localeOffset = -(new Date().getTimezoneOffset());
        for (var index in data){
            data[index]["x"] = moment(data[index]["x"]).add(localeOffset, 'm').toDate()
            data[index]["y"] = parseFloat(data[index]["y"]);
        }
        return data;
    }
    

    
    public formatDate(date){
        

        let localeOffset = -(new Date().getTimezoneOffset());
        return moment(date).add(localeOffset, 'm').format("DD/MM/YYYY, h:mma");        
		//return moment(date).format("DD/MM/YYYY, h:mma");       
    }
    
    
    public formatLongDate(date){
        return moment(date).format("dddd Do MMM");
    }

 

    
    public saveOrdersInstance(instance){
        this.ordersChartInstance = instance;
        setTimeout(() => {
            this.ordersChartInstance.reflow();
        },500);        
    } 
    
 

    
    public savePieChartInstance(instance){
        this.pieChartInstance = instance;
        setTimeout(() => {
            this.pieChartInstance.reflow();
        },500);        
    } 
    
        
    public formatDatabase(date){
        return moment(date).format("YYYY-MM-DD");
    }

    
    

    ngOnInit() {
    }

}
