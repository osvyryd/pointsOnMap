<%@ page contentType="text/html; charset=iso-8859-1" language="java"%>
<%@ page import="java.util.*"%>
<%@ page import="com.softserve.tasks.task_2.task_2_1.*"%>
<%
         Collection<IPoint> points = new HashSet<IPoint>(200,1);

         Random random = new Random();
         for(int i = 0; i < 900; i++){
             points.add(new PointByGeoCoordinates(random.nextDouble() / 10 + 48.86, random.nextDouble() / 10 + 24.63)); //48.9133962,24.9172989
         }

         IPointsFinder pointsOnMap = new PointsOnMap(points);

         String lat = request.getParameter("lat");
         String lng = request.getParameter("lng");
		 String rad = request.getParameter("radius");

         IPoint myPosition = new PointByGeoCoordinates(Double.parseDouble(lat),Double.parseDouble(lng));

		 int radius = Integer.parseInt(rad);
         String s = "{\"points\" : [";
         for(IPoint currentPoint : pointsOnMap.getPointsNearMe(myPosition, radius)){
            s = s.concat(currentPoint+", ");
         }
         s = s.concat("]}");
		 out.print(s);

%>
