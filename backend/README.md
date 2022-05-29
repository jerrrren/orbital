To run the backend, fill up the .env file with the corresponding values and run the following commands in the backend directory:

cd migrations
go run *.go init
go run *.go up
cd ..
source .env
go run main.go

Then the backend should be ready.
