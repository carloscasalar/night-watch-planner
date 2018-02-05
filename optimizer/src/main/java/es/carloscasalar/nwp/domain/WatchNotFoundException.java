package es.carloscasalar.nwp.domain;

public class WatchNotFoundException extends RuntimeException {
    public WatchNotFoundException(int order) {
        super("No Watch found with order " + order);
    }
}
