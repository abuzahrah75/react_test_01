# Part 2: Technical Design

## Question

Let’s say that we have plot all the scooters in Singapore on a map (hundreds of thousands) for our operations team to understand where all the scooters currently are. Please describe how you would do that, focusing on usability, performance and scalability. You can focus more on the front end, the backend or discuss both equally in your answer. (~1 page should be fine, but feel free to use more space if needed.)

## Answer

The way the current system works, is to simply render every single scooter object on the map, regardless of how many are available. This might be feasable with data points count much less 1k, but will not scale beyond that. 

From my observations, at 1k of data points, the UI starts to chug a little. Ideally, we should not render more than 100 icons on the map. In terms of network payload, 1k of data points amounts to about 200KB of payload size, which is not too big at this scale. With 100k of data points, this will amount to around 20MB of network payload. This may still be feasible but might cause noticeable lag to the user.

Below are some possible improvements.

### Frontend Network Call Rate Limit

I believe we should not be fetching scooters list every few miliseconds. I added a [debounce](https://lodash.com/docs/4.17.15#debounce) of few 100ms to save bandwidth.

### Frontend Maps Clustering

When a user zooms out completely to view the whole of Singapore, they might expect to see 100k of scooters on the map. However, this is hardly useful.

Instead, at zoom out level, we should show scooters as clusters in each region. As an example, when viewing the whole of Singapore, we should divide the map into 10 regions, show a huge icon in each with the number of scooters in each region.

As the user zooms further in, the cluster breaks up into smaller clusters, and the user can further understand how many scooters are in region.

At higher zoom-in levels, user should be able to see and interact with individual scooters.

I believe this is a common technique for handling large amount of map data. The regular Google Maps JS API has support for this, and is documented [here](https://developers.google.com/maps/documentation/javascript/marker-clustering). It should be possible to do the same in React JS as well.

### Backend Maps Clustering

Adding frontend clustering as above, will help improve UI render performance. However, we still need to worry about the 20MB payload data to send over the network. If we only need to render less than 100 points on the map at each time, I think sending 100k data points is wasteful.

We can probably move the maps clustering logic to the backend. The backend should take `zoom_level`, `lat`, `lng` as input from the frontend. In return, it should return a list of `Clusters` or `Scooters` based on zoom levels, similar to the clustering behaviour described above.

At zoomed out level, the backend can return a list of `Clusters`. At zoomed in level, the backend can return a list of `Scooters`. For anything in between, it should be possible to return a mixed list of `Clusters` and `Scooters`.

This should allow us to keep the network payload size, well below 100KB.

### Backend Scale Out

Doing map clustering in backend might cost more cpu compute. I don't expect this to be an issue, given that only internal operation users would use a system such as this. But the backend api should be stateless, and should scale out horizontally. It should be possible to add more backend instances, without causing breakages.

Scooters API should be its own separate service that can scale out independently of other systems.

If we have to authenticate users, we can move to JWT based authentication, so we can authenticate users without putting more load on a central auth service.

### Alternative DB Storage

MySQL is probably not the best candidate for storing location data. It was chosen for this project due to its simplicity. We can probably try a different storage that has better support for location data, such as Postgres + PostGIS.

Postgres + PostGIS probably has some location specific features such as distance calculation that we can make use to improve performance.

I am not sure if performance can be improved this way, but it is worth exploring.

### Database Read Replicas

We should add read replica slave databases, used exclusively for this backend API. This allows us to scale out the database as well.
