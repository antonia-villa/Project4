# Visualize Washington State Counties
https://visualize-wa-county-data.herokuapp.com/

Dive into Washington state county level census data from 2015. This is an exploration and project aimed to learn how to map geoData using topoJSON files and D3.

![](/client//public/img/home_page.png) 
![](/client//public/img/home_page_2.png) 

## Requirements
* Map geo data at county or state level
* Acess census data from open source API: Livestories
* Include interactions to reveal further data
* Refine D3 skills

## Technologies Used
* Node/Express
   * Key APIs:
   	 * LiveStores - open source catalog of census data
* D3
* qGIS


## User Stories
The target user for this app is any citizen curious about data collection at the county level and associations between data points collected by the census.


## Development Sprints and Process

### Sprint 1
##### Brainstorm and Choose idea
##### 1. Explored API
##### 2. Researched Census Data Organization and GeoCodes
##### 3. Identify data requirements for visualization
##### 4. Export all available studies from API catalog to SQL database to search through data
##### 5. Choose census study that contains Geo location data at county level
##### 6. Learned how to use qGIS software to create topoJSON file for mapping 

### Sprint 2
##### 1. Created API call for GEOData
##### 2. Developed Javascript functions to reformat API repsonse data to match GEOCode for topoJSON file
##### 3. Mapped Census data to topoJSON file 

### Sprint 3
##### 1. Choose comparison data set from API and create API call
##### 2. Data cleansing functions for API data
##### 3. Create D3 Bar chart

### Sprint 4
##### 1. Consider layout of data and display
##### 2. Create pop-up modal to show second data set
##### 3. Make D3 Visuals mobile friendly
##### 4. Finalize CSS and layout of data

#### Backlog
  * Include more robust datasets
  * Filtering option by Year for available data sets
  * Multiple comparison datasets for user to choose view

## Routes, Component Structure, and Models
* **Routes**
  * Home
    * `GET /` - main route for API call


* **Models**
  * datasets - 
  	* Purpose: store census data studies to be able to easily search for available data
  	* Fields: dataset_id, category
    * NOTE: The database is not accessed by the application. It was strictly used for research purposes to understand available data by category. 

## Steps to Setting Up
If you'd like to set this project up on your own local server: 
* Fork and clone this repository
* Run `npm install` to install dependencies in both client and main project folder
  * Use `nodemon` to run the application in the main project folder
* NOTE: Database is not necessary


## Sources
* Live Storeis
  * API Endpoint - https://liveapi.livestories.com/study/*
  * Unemployment Data - https://liveapi.livestories.com/observation/study/COM.POLICYMAP.US.GOV.US.DOL.BLS.EMPLOYMENT:UNEMPRATE/locale/US:ST:WA,US:ST:WA:CO:*
  * Enrollement Data - https://liveapi.livestories.com/observation/study/ACS:B14001/locale/US:ST:WA:CO:*
* MAP topoJSON File
  * Map Link - 