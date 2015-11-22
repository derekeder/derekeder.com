---
layout: post
title: How Chicago Public Schools Succeeded with Open Source Software
categories: 
  - blog
date: 2012-11-14
description: "On August 17, 2012, Chicago Public Schools (CPS) launched a new version of their School Locator - an online map that helps parents find public schools for their kids. Unlike the map that came before it, this one is intuitive, easy to use, and took half the time to build. How was CPS able to accomplish this? By doing it in-house and using open source software."
image: /images/blog/cps-locator/cps-locator.jpg
---

<p><a href='http://cps.edu/map'><img class='img-polaroid' src='/images/blog/cps-locator/cps-locator.jpg' title='Jekyll' alt='Jekyll'></a></p>
            
<p><em>This article was also published on Nov 12, 2012 on the Huffington Post under the title <a href="http://www.huffingtonpost.com/derek-eder/chicago-public-schools-locator-map_b_2119284.html">Hacking Chicago</a>.</em></p>

<p>On August 17, 2012, Chicago Public Schools (CPS) launched a new version of their <a href="http://cps.edu/map">School Locator</a> - an online map that helps parents find public schools for their kids. Unlike the map that came before it, this one is intuitive, easy to use, and took half the time to build.</p>

<p>How was CPS able to accomplish this?</p>

<p>By doing it in-house and using open source software.</p>

### The backstory

Governments usually build web apps like this one by hiring private contractors through a process called [procurement](http://en.wikipedia.org/wiki/Procurement). They publish a ‘“request for proposals” describing the project, and companies bid for the contract. Procurement is long and bureaucratic, often leading to inflated bids by a small group of companies that know how to navigate the process.

In 2003, CPS paid a contractor $15,000 to design the original School Locator app. It took them four months to build:

<p><img class='img-polaroid' src='/images/blog/cps-locator/cps-locator-old.jpg' title='The Previous CPS School Locator' alt='The Previous CPS School Locator'></p>

The Previous CPS School Locator

Over the years, the internet marched on, but the map stood still. Despite getting thousands of daily hits, it was hard to use and not up to the standards parents had come to expect from other websites. 

To top it off, there was nobody left at CPS who knew how the map worked, or how to update it. 

A redesign of the map was sorely needed. CPS was left with a choice: hire another contractor through procurement, or try to it in-house.

### Enter Open City

In March of 2012, civic hackers at [Open City](http://opencityapps.org/) (myself included) launched [Chicago Public School Tiers](http://cpstiers.opencityapps.org), an app to help parents enroll their kids in Chicago’s selective schools. 

In Chicago, selective schools only admit a certain number of students from each of the city’s four socioeconomic “tiers.” What tier you live in really affects which schools you should apply to. But before we built the app, finding your tier was a huge ordeal.

<p><a href='http://cpstiers.opencityapps.org'><img class='img-polaroid' src='/images/blog/cps-locator/cps-tiers.jpg' title='Chicago Public School Tiers Website by Open City' alt='Chicago Public School Tiers Website by Open City'></a></p>

Chicago Public School Tiers Website by Open City

We built the app using free Google tools: [Google Maps](https://developers.google.com/maps/documentation/javascript/) to gave us an interactive map of Chicago, and [Fusion Tables](http://www.google.com/fusiontables/Home/) stored the locations of the city’s CPS tiers. 

Moreover, CPS Tiers is open source software, which means anybody can reuse [the code that powers the app](https://github.com/open-city/cps-tiers). 

The map’s ease of use and value to parents attracted CPS’s attention. If a group of civic hackers could put together a useful tool for parents in their spare time, could they do the same? 

### “Here goes nuthin’!”

Alex Soble, CPS Director of Social Media, wanted to find out. He asked CPS web developers Jay Van Patten and Ted Canji to look into the [free map template](http://derekeder.com/searchable_map_template/) that powers CPS Tiers, and they used it to build a functional prototype of the School Locator map in under three days.

By avoiding procurement, Jay and Ted had time to get feedback on the app from CPS staff, parents and Chicago technologists, leading to a better product.

On August 17th - just eight weeks after starting the project - CPS launched its new School Locator map, to [rave reviews](http://storify.com/alexsoble/reactions-to-cps-s-new-school-locator-tool) from CPS parents and students.

### Takeaways

What can we learn from this tale?

Parents and students won. They now have an intuitive tool to help them navigate Chicago’s schools. This is a tiny victory in a much larger struggle: making [digital public services](http://digital.cabinetoffice.gov.uk/) radically more user-friendly is probably the key tech challenge for government in the digital age.

CPS saved lots of money on this project. Going through procurement would have taken at least twice as much time and money, and probably resulted in a worse app.

CPS’s web team learned new skills. Going forward, they can make countless interactive maps. 

In September, Chicago’s schools closed during a teacher’s strike. The web team was able to quickly build a [map of alternative places](http://cps.edu/ChildrenFirst/Pages/ChildrenFirstLocator.aspx) for parents to take their kids. 

Government tech folks, take note: open source software is the easiest way to empower your employees.