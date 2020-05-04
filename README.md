# Day-Planner
A simple calendar application that allows the user to plan events for each hour of the day.

## User Story

AS AN employee with a busy schedule

I WANT to add important events to a daily planner

SO THAT I can manage my time effectively 

## Business Context

Poor time management results in missed meetings and deadlines or creates the appearance of unprofessionalism. A daily planner allows employees to see their day at a glance, schedule time effectively, and improve productivity. 

## Application description

This app runs in the browser and features dynamically updated HTML and CSS powered by jQuery.

The app displays standard business hours (9 a.m. to 5 p.m.). Each time slot represents one hour and contain the following:

* The time

* A text area field to hold the planned tasks

* A save button

Clicking on the save button stores the time and planned tasks in `localStorage`, allowing the text to persist when the application is refreshed.

The top of the calendar, displays the current day. The application persists the saved tasks only till the end of current day. 

Additionally, each hour is color coded to reflect whether the time slot is in the past, the present, or the future. This changes dynamically depending on the time of day.


## Deployed application URL 

https://ananya92.github.io/Day-Planner/

## Application Screenshot
![Project Snapshot](https://github.com/ananya92/My-Portfolio/blob/master/src/components/projects/img/pr9_1.png)

