# TODO

## Details

1. Authentication Screens [ ]
   * RegisterScreen: For account creation (username + password) [ ]
   * LoginScreen: For user login [ ]

2. Main App Screens [ ]
   * HomeScreen: Landing page after login (could show both movies and series highlights) [ ]
   * MoviesScreen: List of all movies with top 5 rated section [ ]
     * pagination with list of 10 [ ]
     * best 5 rated movies section [ ]
   * SeriesScreen: List of all series with top 5 rated section [ ]
     * pagination with list of 10 [ ]
     * best 5 rated series section [ ]
   * SearchScreen: Unified search for both movies and series [ ]

3. Detail Screens [ ]
   * MovieDetailScreen: Detailed view of a single movie [ ]
     * WatchTrailer Dedicated for playing trailers [ ]
   * SeriesDetailScreen: Detailed view of a single series [ ]
     * WatchTrailer Dedicated for playing trailers [ ]
  
## Navigation Flow

```bash
RegisterScreen → LoginScreen → HomeScreen
    ↑                    ↑
    └────────────┘       └───────────┘

HomeScreen → MoviesScreen → MovieDetailScreen → WatchTrailerScreen
           → SeriesScreen → SeriesDetailScreen → WatchTrailerScreen
           → SearchScreen
```
