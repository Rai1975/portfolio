I worked on this paper with [Dr. Philip Wilsey](https://www.linkedin.com/in/philipwilsey/) and [Dr. Rohit Pal](https://www.linkedin.com/in/rohit-pal-singh-794a6923/) in UC's Experimental Computing Lab as an Undergraduate Research Assistant. 

The problem we were trying to solve was the space and time complex existing algorithms had with regards to extracting features from data/point clouds in higher dimensions, like r^15+

<img src="../assets/paper-diagram.png" width="300">

This paper introducted a novel sparsified complex method, where we could set a parameter beta, to change the shape of the complex used from a delaunay triangle (b = 0.33), moving up to circle at b = 1 and beyond from there

I specifically worked on performance testing and optimization for different values of beta, different dimensions and comlexities of datasets.

This was super fun, and going down the mathematical rabbit hole of topology was even cooler.

Link to paper - https://doi.org/10.3390/math14081339
