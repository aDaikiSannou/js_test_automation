#! /bin/sh

# path to jscover
JSCOVER_PATH="../libs/JSCover-all.jar"
# root directory
ROOT_DIR=".."
# directories not to instrument
LIBS_DIR="libs"
TEST_DIR="test_jasmine"
# source directory
SRC_DIR="../src"
# report directory
REPORT_DIR="report"
# report directory for phantomjs
PHANTOM_REPORT_DIR="$REPORT_DIR/phantom"
# jscover port
PORT="8081"
# jscover test url
TEST_URL="http://localhost:$PORT/test_jasmine/SpecRunner.html"
# url to stop jscover
STOP_URL="http://localhost:$PORT/stop"

if [ -d $PHANTOM_REPORT_DIR ]; then
  rm -r $PHANTOM_REPORT_DIR
fi
mkdir --parents $PHANTOM_REPORT_DIR
java -Dfile.encoding=UTF-8 -jar $JSCOVER_PATH -ws --port=$PORT --document-root=$ROOT_DIR --no-instrument=$LIBS_DIR --no-instrument=$TEST_DIR --report-dir=$REPORT_DIR &
phantomjs run-jscover-jasmine.js $TEST_URL | sed -n -e "s/^###TAP###//gp" > $PHANTOM_REPORT_DIR/tap.txt
java -cp $JSCOVER_PATH jscover.report.Main --format=COBERTURAXML $PHANTOM_REPORT_DIR $SRC_DIR
phantomjs stop-jscover.js $STOP_URL
