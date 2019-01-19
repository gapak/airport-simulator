# airport-simulator

The game is in progress.

To start playing do the following:

```-npm install```

```-npm start```

For the current version are available:
- passengers generation
- hiring and firing workers
- buying constructions
- applying workers on constructions

Note: Constructions don't work without workers.
Workers increase a bandwidth of construction.
The more construction you have the more workers you need on it.
It's possible to add any number of workers to a construction,
but a bonus from them will increase logarithmic.
So if you have one worker on a construction it have 100% of it's default bandwidth.
If you have two workers on one construction it have 150% of it's default bandwidth.
If you have three workers on one construction it have 175% of it's default bandwidth and so on.

The money is getting from passengers who arrive from a plane.
Salary is charged every day, $10 for every busy or free worker.

If you have too big queue on a construction you probably need to buy one more, or apply an additional worker.

Features in progress:
- Choosing an airport
- Technologies
- Baggage
- Disasters
