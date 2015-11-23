---
layout: post
title: Keeping Tabs on Your Local City Council with Councilmatic
categories: 
  - blog
date: 2013-06-24
description: "City councils shape nearly every aspect of city life, from what kind of canopy you can have on a storefront, to how much we pay in taxes, to the number of cops on the street. There's now an app for viewing all this legislative information: Councilmatic."
image: /images/blog/councilmatic/chicago-councilmatic-1.png
---

<p><a href='http://chicagocouncilmatic.org'><img class='img-thumbnail' src='/images/blog/councilmatic/chicago-councilmatic-1.png' title='Chicago Councilmatic' alt='Chicago Councilmatic'></a></p>
            
<p><em>This article was also published on June 21, 2013 on the <a href="http://sunlightfoundation.com/blog/2013/06/21/opengov-voices-keeping-tabs-on-your-local-city-council-with-councilmatic/">Sunlight Foundation blog</a>.</em></p>

<p>City councils shape nearly every aspect of city life, from what kind of canopy you can have on a storefront, to how much we pay in taxes, to the number of cops on the street.</p>

<p>Unfortunately, it is hard for citizens to keep tabs on what their city council is doing. A few years ago, if you wanted to be informed about a city council’s actions, you had to go to the clerk’s office and page through the hundreds or thousands of bills that were added or updated every month.</p>

In recent years, many city clerks have taken a big step forward by[ publishing](http://legistar.council.nyc.gov/Legislation.aspx)[ this](http://chicago.legistar.com/Legislation.aspx)[ legislation](http://phila.legistar.com/) online. However, the current generation of municipal legislative information systems are mainly built to help councilmembers and clerks’ offices manage legislation. They were not built to help the public to understand what their city council is doing.

Well, like so many of our problems, now there’s an app for that: Councilmatic.

Originally built by[ Code for America](http://codeforamerica.org/) for Philadelphia in 2011,[ Councilmatic](http://www.councilmatic.org/) lets anyone browse, search and subscribe to any piece of legislation published by a city.

Not wanting to reinvent the wheel, as often happens with civic software, we decided to customize this existing[ open source](https://github.com/codeforamerica/councilmatic) platform and set up[ Chicago Councilmatic](http://chicagocouncilmatic.org/).

<p><a href='http://chicagocouncilmatic.org/legislation/1425826'><img class='img-thumbnail' src='/images/blog/councilmatic/chicago-councilmatic-2.png' title='Chicago Metered Parking System Concession Agreement' alt='Chicago Metered Parking System Concession Agreement'></a></p>

Every city council is different, however, so when we set up Councilmatic for Chicago, it wasn’t just a turnkey operation. Chicago is unique in that it introduces and passes one to two thousand ordinances every month (an unusually large volume). Most of these are[ routine](http://chicagocouncilmatic.org/search/?q=&amp;topics=Routine) ordinances like[ sign permits](http://chicagocouncilmatic.org/search/?q=&amp;topics=Sign+permits),[ damaged vehicle claims](http://chicagocouncilmatic.org/search/?q=&amp;topics=Damage+to+vehicle+claim),[ sidewalk cafe approvals](http://chicagocouncilmatic.org/search/?q=&amp;topics=Sidewalk+cafe) and[ honorifics](http://chicagocouncilmatic.org/search/?q=&amp;topics=Honorific).

To help citizens sort through all of this, we customized Chicago Councilmatic to classify and tag all legislation. If something is not a routine piece of legislation (like[ the recent parking meter renegotiation](http://chicagocouncilmatic.org/legislation/1425826)), it is tagged as[ non-routine](http://chicagocouncilmatic.org/search/?q=&amp;topics=Non-Routine) to make it easier to discover.

We also wanted to show which legislation an alderman (or the[ Mayor](http://chicagocouncilmatic.org/member/105)) sponsored and send email updates to subscribers whenever an alderman sponsors something new. There’s also a[ leaderboard](http://chicagocouncilmatic.org/members/) based on volume of sponsored legislation shows which aldermen are the most active.

<p><a href='http://chicagocouncilmatic.org/members'><img class='img-thumbnail' src='/images/blog/councilmatic/chicago-councilmatic-3.png' title='Chicago Aldermen' alt='Chicago Aldermen'></a></p>

The launch of Chicago Councilmatic on the[ National Day of Civic Hacking](http://hackforchange.org/) has already[ made](http://gapersblock.com/mechanics/2013/06/04/keep-tabs-on-city-council-and-your-alderman-with-councilmatic/)[ a](http://www.marinacityonline.com/news/council0611.htm)[ splash](https://twitter.com/Fioretti2ndWard/status/340940707269328897) in Chicago, but we’re not stopping there. The Councilmatic platform is now operating in two major U.S. cities — we want it to be deployed in as many as possible.

That’s why this summer, we’re partnering with Code for America’s[ Great American Civic Hack](http://brigade.codeforamerica.org/civic-coding) to make Councilmatic even easier to deploy and assist any group who wants to stand up a Councilmatic instance.

Do you want to help bring more transparency and openness to your local city council? [Get in touch](mailto:councilmatic-info@opencityapps.org) and we’ll make it happen, together.