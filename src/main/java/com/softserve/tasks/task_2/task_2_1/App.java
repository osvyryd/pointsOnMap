package com.softserve.tasks.task_2.task_2_1;

import java.util.Collection;
import java.util.HashSet;
import java.util.Random;

/**
 * Created by BAXA on 15.10.2014.
 */
public class App {
    public static void main(String[] args){
        Collection<IPoint> points = new HashSet<IPoint>(200,1);

        Random random = new Random();
        for(int i = 0; i < 200; i++){
            points.add(new PointByGeoCoordinates(random.nextDouble() / 10 + 48.86, random.nextDouble() / 10 + 24.63)); //48.9133962,24.9172989
        }

        IPointsFinder pointsOnMap = new PointsOnMap(points);

        IPoint myPosition = new PointByGeoCoordinates(48.9120,24.68753527258d);

        int radius = 800;

        for(IPoint currentPoint : pointsOnMap.getPointsNearMe(myPosition, radius)){
            System.out.println(currentPoint);
        }
    }
}
